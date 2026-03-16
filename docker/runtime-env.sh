#!/bin/sh
set -eu

TARGET_FILE="/usr/share/nginx/html/__import_meta_env__.js"

escape_js() {
  printf '%s' "${1:-}" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

{
  printf 'globalThis.import_meta_env = {\n'

  first=1
  while IFS='=' read -r key value; do
    case "$key" in
      VITE_*)
        if [ "$first" -eq 0 ]; then
          printf ',\n'
        fi
        first=0
        printf '  "%s": "%s"' "$key" "$(escape_js "$value")"
        ;;
    esac
  done <<EOF
$(printenv | sort)
EOF

  printf '\n};\n'
} > "$TARGET_FILE"