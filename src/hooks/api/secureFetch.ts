export function secureFetch(
    input: RequestInfo,
    init: RequestInit = {}
): Promise<Response> {
    const token = localStorage.getItem("accessToken");

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(init.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return fetch(input, {...init, headers})
}