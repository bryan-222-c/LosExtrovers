const pdf = require('pdf-parse');
const fs = require('fs');

async function test() {
  try {
    const dataBuffer = fs.readFileSync('/tmp/drive_file');
    const parser = new pdf.PDFParse({ data: dataBuffer });
    await parser.load();
    const result = await parser.getText();
    console.log("Result keys:", typeof result, result ? Object.keys(result) : "null");
    
    // Write text to extracted_text.txt
    if (result && result.text) {
      fs.writeFileSync('extracted_text.txt', result.text);
      console.log("Wrote text to extracted_text.txt. Character length:", result.text.length);
    } else if (typeof result === 'string') {
      fs.writeFileSync('extracted_text.txt', result);
      console.log("Wrote text to extracted_text.txt. Character length:", result.length);
    } else {
      console.log("Result structure:", result);
    }
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
