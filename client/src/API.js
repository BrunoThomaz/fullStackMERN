const API_URL = 'http://localhost:1337';

export async function listLogEntries(operadora) {
    const query = operadora.toLowerCase();
    try {
        const response = await fetch(`${API_URL}/api/logs/${query}`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}


export async function createLogEntry(entry) {
    const response = await fetch(`${API_URL}/api/logs`,{
        method:'POST',
        headers: {
            'content-type':'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}