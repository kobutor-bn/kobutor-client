export default async (req, context) => {
    const path = req.url.replace('/.netlify/functions/api-proxy', '');
    const EC2_URL = 'http://34.196.37.58:2335';

    try {
        const response = await fetch(`${EC2_URL}${path}`, {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                ...req.headers
            },
            body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined
        });

        const data = await response.text();

        return new Response(data, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('content-type') || 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};