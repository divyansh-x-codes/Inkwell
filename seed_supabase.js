import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ennzcnajzkymimepitqn.supabase.co';
const supabaseAnonKey = 'sb_publishable_7o7B-l6dXs-W9anp_OwSCA_ZfemIY97';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const initialArticles = [
  {
    title: "The Future of AI in Design",
    tagline: "Exploring how generative models are transforming the creative process.",
    content: "AI is not just a tool; it's a collaborator. In this article, we look at...",
    author_name: "Alex Rivera",
    category: "Design",
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    read_time: "5 min read"
  },
  {
    title: "Mastering React Server Components",
    tagline: "A deep dive into the new architecture of modern web apps.",
    content: "Server components are changing the way we think about data fetching...",
    author_name: "Sarah Chen",
    category: "Technology",
    cover_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    read_time: "8 min read"
  }
];

async function seed() {
  console.log('Seeding initial articles...');
  const { data, error } = await supabase.from('articles').insert(initialArticles);
  
  if (error) {
    if (error.message.includes('not found')) {
      console.error('❌ Table not found! Please run the SQL schema first.');
    } else {
      console.error('Error seeding data:', error.message);
    }
  } else {
    console.log('✅ Successfully seeded articles!');
  }
}

seed();
