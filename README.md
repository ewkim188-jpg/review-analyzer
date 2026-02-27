# ReviewAI: AI-Powered Review Analysis & Sentiment Insights

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![LangChain](https://img.shields.io/badge/LangChain-1.1.19-green?style=flat-square)](https://js.langchain.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-blue?style=flat-square&logo=openai)](https://openai.com/)
[![Pinecone](https://img.shields.io/badge/Pinecone-VectorDB-blueviolet?style=flat-square)](https://www.pinecone.io/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-emerald?style=flat-square&logo=supabase)](https://supabase.com/)

**ReviewAI** is a high-performance, AI-driven platform designed to analyze thousands of customer reviews in seconds. By leveraging Large Language Models (LLMs) and Vector Databases, it provides deep semantic insights, sentiment analysis, and a chat-based interface to query product strengths and weaknesses.

## 🚀 Core Features

- **⚡ Instant Review Indexing**: Automatically process and vectorize thousands of reviews using Pinecone for ultra-fast semantic retrieval.
- **🤖 AI-Powered Q&A**: Chat with your reviews. Ask specific questions like *"How is the battery life?"* or *"Is the build quality worth the price?"*.
- **📊 Sentiment Insights**: Get a structured summary of pros and cons derived from real user feedback.
- **🔍 Semantic Search**: Find relevant reviews based on context and meaning, not just keywords.
- **📱 Modern UI/UX**: A sleek, responsive dashboard built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI Framework**: [LangChain](https://js.langchain.com/)
- **LLM**: [OpenAI GPT-4o](https://openai.com/)
- **Vector Database**: [Pinecone](https://www.pinecone.io/)
- **Database**: [Supabase](https://supabase.com/)
- **Languages**: TypeScript, JavaScript

## 🏁 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Accounts for OpenAI, Pinecone, and Supabase

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/review-analyzer.git
   cd review-analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   OPENAI_API_KEY=your_openai_key
   PINECONE_API_KEY=your_pinecone_key
   PINECONE_INDEX_NAME=your_index_name
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Index Sample Data**:
   Navigate to the homepage and click the **"샘플 데이터 인덱싱"** (Sample Data Indexing) button to prepare the database for analysis.

## 📈 SEO & Optimization

This project is optimized for search engines by focusing on key terms like **AI Review Analyzer**, **Sentiment Analysis with GPT-4**, and **Vector Search for Customer Feedback**. The architecture is designed for scalability and performance.

## 📄 License

This project is licensed under the MIT License.

---
*Created with ❤️ by [Kim Eun-woo](https://github.com/ewkim188-jpg)*
