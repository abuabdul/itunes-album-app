export default async function handler(req, res) {
  try {
    const url = new URL('https://itunes.apple.com/search');
    const queryParams = new URLSearchParams(req.query);
    url.search = queryParams.toString();
    const apiResponse = await fetch(url)
    const json = await apiResponse.json();
    res.status(200).json(json)
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ 
      error: 'internal server error', 
      message: error.message 
    })
  }
}