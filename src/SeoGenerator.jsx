// src/SeoGenerator.js
import React, { useState } from 'react';
import axios from 'axios';

const SeoGenerator = () => {
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSeoContent = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `Generate an SEO title and description for: ${input}` }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`, // Replace with your OpenAI API key
          },
        }
      );

      const content = response.data.choices[0].message.content.split('\n')
      console.log(content)
      setTitle(content[0]);
     setDescription(content[1]);
    } catch (error) {
      console.error('Error generating SEO content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>SEO Title and Description Generator</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter topic or keywords"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={generateSeoContent} disabled={loading}>
        {loading ? 'Generating...' : 'Generate SEO Title and Description'}
      </button>
      {title && (
        <div>
          <h2>Generated Title:</h2>
          <p>{title}</p>
          <h2>Generated Description:</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default SeoGenerator;
