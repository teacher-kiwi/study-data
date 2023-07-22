const axios = require('axios'); 
const fs = require('fs');

const naverocr = async (imagePath) => {
  try {
    const clientSecret = process.env.NAVER_SECRET_KEY; // 네이버 개발자 센터에서 발급 받은 클라이언트 Secret
    
    const naverjson = {
      version: 'V2',
      requestId: 'string112233',
      timestamp: 0,
      name: 'demo',
      images: [
        {
          format: 'png',
          name: 'ocrimage',
          data: fs.readFileSync(imagePath, 'base64'),
        },
      ],
    };

    const response = await axios.post(process.env.NAVER_APIGW_INVOKE_URL,
    naverjson,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-OCR-SECRET': clientSecret,
        }
      }
    );

    const jObject = response.data;
    let tmptxtnaver = "";
    let tmptxtnaver2 = "";
    const fields = jObject.images[0].fields;
    
    for (const field of fields) {
      tmptxtnaver += field.inferText + " ";
    
      if (field.lineBreak === true) {
        tmptxtnaver2 += tmptxtnaver + "\n";
        tmptxtnaver = "";
      }
    }
    return tmptxtnaver2;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to perform OCR');
  }
}

module.exports = {naverocr};
