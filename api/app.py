import os
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize OpenAI client
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

@app.route('/analyze-name', methods=['POST'])
def analyze_name():
    data = request.get_json()
    name = data.get('name')
    
    if not name:
        return jsonify({'error': 'Name is required'}), 400
    
    try:
        # Create the prompt for analyzing name connotations
        prompt = f"""Please analyze the connotations, cultural significance, and potential implications of the name '{name}'. Consider:
1. Cultural meanings across different regions
2. Historical significance
3. Potential positive and negative associations
4. Similar sounding words or names
5. Overall impression and suitability as a brand name"""

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that analyzes names and their connotations."},
                {"role": "user", "content": prompt}
            ]
        )
        
        # Extract the analysis from the response
        analysis = response.choices[0].message.content
        
        return jsonify({
            'name': name,
            'analysis': analysis
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)