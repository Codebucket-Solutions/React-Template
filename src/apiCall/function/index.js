import { axios } from "../../shared/axios";
import { getDataFromStore } from "../../store/getStore"

export const getToken = (section) => {
    const auth = getDataFromStore(section);
    const token = auth?.auth?.token || auth?.token?.token;
    if (token) return token;
};

function removeNonISO88591Characters(input) {
    // Regex to match valid ISO-8859-1 characters
    const iso88591Regex = /^[\\x00-\\xFF]*$/;
    // Filter out invalid characters
    return Array.from(input).filter(char => iso88591Regex.test(char)).join('');
}

export const apiFunction = async (url, method, postData, token, extraConfig, section, extraHeader, callback) => {
    let config = {
        method: method,
        url: url,
        data: postData ? postData : {},
    };
    let data;
    if (token) {
        let token = getToken(section);
        config = {
            ...config,
            headers: { token: `${token}` },
        };
    }

    if (extraConfig === "blob") {
        config = {
            ...config,
            responseType: 'blob',
        }
    }

    if (extraConfig === "formData") {
        config = {
            ...config,
            headers: { ...config.headers, "content-type": "multipart/form-data" },
            onUploadProgress: progressEvent => {
                callback(Math.round(progressEvent.loaded / progressEvent.total * 100))
            }
        }
    }

    if (extraHeader?.log) {
        config = {
            ...config,
            headers: {
                ...config.headers, log: extraHeader.log,
                additionalData: removeNonISO88591Characters(JSON.stringify(extraHeader.additionalData))
            },
        }
    }
    else if (extraHeader) {
        config = {
            ...config,
            headers: {
                ...config.headers,
            },
        }
    }

    await axios({ ...config })
        .then((res) => {
            if (extraConfig === "blob") {
                data = res.data
            }
            else {
                data = {
                    data: typeof res.data.data == "boolean" ? res.data.data : (res.data.data ? res.data.data : {}),
                    status: res.data.status === "success" ? true : false,
                    message: res.data.status,
                };
            }
        })
        .catch((err) => {
            if (err.response?.data) {
                data = {
                    ...err.response.data,
                    status: false,
                };
            }
            else {
                data = {
                    message: "Something went wrong. Please try again",
                    status: false,
                };
            }

        });
    return data;
};




