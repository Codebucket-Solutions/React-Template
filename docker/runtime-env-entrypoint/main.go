package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"syscall"
)

const defaultOutputPath = "/tmp/react-template-runtime-env/__import_meta_env__.js"

func main() {
	command := os.Args[1:]
	if len(command) == 0 {
		command = []string{"/usr/sbin/nginx", "-g", "daemon off;"}
	}

	outputPath := getenv("IMPORT_META_ENV_OUTPUT", defaultOutputPath)

	runtimeEnv := collectRuntimeEnv()
	if err := writeRuntimeEnv(outputPath, runtimeEnv); err != nil {
		fatalf("write runtime env file: %v", err)
	}

	binary, err := exec.LookPath(command[0])
	if err != nil {
		fatalf("resolve startup command %q: %v", command[0], err)
	}

	if err := syscall.Exec(binary, command, os.Environ()); err != nil {
		fatalf("exec %q: %v", binary, err)
	}
}

func collectRuntimeEnv() map[string]string {
	runtimeEnv := make(map[string]string)
	for _, entry := range os.Environ() {
		separatorIndex := strings.Index(entry, "=")
		if separatorIndex == -1 {
			continue
		}

		key := entry[:separatorIndex]
		if !strings.HasPrefix(key, "VITE_") {
			continue
		}

		runtimeEnv[key] = entry[separatorIndex+1:]
	}

	return runtimeEnv
}

func writeRuntimeEnv(outputPath string, runtimeEnv map[string]string) error {
	if err := os.MkdirAll(filepath.Dir(outputPath), 0o755); err != nil {
		return err
	}

	keys := make([]string, 0, len(runtimeEnv))
	for key := range runtimeEnv {
		keys = append(keys, key)
	}
	sort.Strings(keys)

	var builder strings.Builder
	builder.WriteString("globalThis.import_meta_env = Object.assign(globalThis.import_meta_env || {}, {\n")
	for index, key := range keys {
		if index > 0 {
			builder.WriteString(",\n")
		}

		builder.WriteString("  ")
		builder.WriteString(strconv.Quote(key))
		builder.WriteString(": ")
		builder.WriteString(strconv.Quote(runtimeEnv[key]))
	}
	builder.WriteString("\n});\n")

	return os.WriteFile(outputPath, []byte(builder.String()), 0o644)
}

func getenv(key string, fallback string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}
	return value
}

func fatalf(format string, values ...any) {
	_, _ = fmt.Fprintf(os.Stderr, format+"\n", values...)
	os.Exit(1)
}
