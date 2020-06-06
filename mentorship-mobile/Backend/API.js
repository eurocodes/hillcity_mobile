export const login = async (email, password) => {
    const response = await fetch("http://localhost:3400/api/v1/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    if (response.ok) {
        return true
    }
    const { message } = await response.json()
    throw new Error(message)
}