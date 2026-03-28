import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const XML_FILE = path.join(__dirname, '../smknegeri1rongga.WordPress.2026-03-28.xml');
const OUTPUT_DIR = path.join(__dirname, '../src/content/berita');

function parseXML(xmlContent) {
  const posts = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemContent = match[1];
    
    const postTypeMatch = itemContent.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
    if (!postTypeMatch || postTypeMatch[1] !== 'post') continue;

    const statusMatch = itemContent.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
    const status = statusMatch ? statusMatch[1] : 'draft';

    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : '';

    if (!title) continue;

    const dateMatch = itemContent.match(/<wp:post_date><!\[CDATA\[(.*?)\]\]><\/wp:post_date>/);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

    const slugMatch = itemContent.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);
    let slug = slugMatch ? slugMatch[1].trim() : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (!slug) slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const authorMatch = itemContent.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/);
    const author = authorMatch ? authorMatch[1] : 'Admin';

    const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
    const content = contentMatch ? contentMatch[1].trim() : '';

    const categories = [];
    const categoryRegex = /<category domain="category" nicename="(.*?)"><!\[CDATA\[(.*?)\]\]><\/category>/g;
    let catMatch;
    while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
      if (catMatch[2]) categories.push(catMatch[2]);
    }

    const excerptMatch = itemContent.match(/<excerpt:encoded><!\[CDATA\[(.*?)\]\]><\/excerpt:encoded>/);
    const excerpt = excerptMatch ? excerptMatch[1].trim() : '';

    posts.push({
      title,
      slug,
      date,
      author,
      content,
      categories,
      excerpt,
      status,
    });
  }

  return posts;
}

function htmlToMarkdown(html) {
  let md = html;

  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n');

  md = md.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i>(.*?)<\/i>/gi, '*$1*');

  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)');

  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');

  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<div[^>]*>(.*?)<\/div>/gi, '\n$1\n');

  md = md.replace(/<hr\s*\/?>/gi, '\n---\n');

  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '\n> $1\n');

  md = md.replace(/<[^>]+>/g, '');

  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");

  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

function generateFrontmatter(post) {
  const dateObj = new Date(post.date);
  const dateStr = dateObj.toISOString().split('T')[0];
  
  const isPublished = post.status === 'publish';

  let fm = '---\n';
  fm += `title: "${post.title.replace(/"/g, '\\"')}"\n`;
  fm += `slug: "${post.slug}"\n`;
  fm += `date: ${dateStr}\n`;
  fm += `author: "${post.author}"\n`;
  
  if (post.categories.length > 0) {
    fm += `categories:\n`;
    post.categories.forEach(cat => {
      fm += `  - "${cat.replace(/"/g, '\\"')}"\n`;
    });
  }
  
  if (post.excerpt) {
    fm += `excerpt: "${post.excerpt.replace(/"/g, '\\"')}"\n`;
  }
  
  fm += `isPublished: ${isPublished}\n`;
  fm += '---\n\n';

  return fm;
}

function migrate() {
  console.log('🔄 Starting WordPress migration...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const xmlContent = fs.readFileSync(XML_FILE, 'utf-8');
  const posts = parseXML(xmlContent);

  console.log(`📰 Found ${posts.length} posts\n`);

  let successCount = 0;
  let publishCount = 0;

  posts.forEach((post, index) => {
    const markdown = generateFrontmatter(post) + htmlToMarkdown(post.content);
    const filename = `${post.date.substring(0, 10)}-${post.slug}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);

    try {
      fs.writeFileSync(filepath, markdown, 'utf-8');
      successCount++;
      if (post.status === 'publish') publishCount++;
      console.log(`✅ ${filename}`);
    } catch (err) {
      console.log(`❌ Error writing ${filename}: ${err.message}`);
    }
  });

  console.log(`\n📊 Migration complete!`);
  console.log(`   Total: ${successCount}/${posts.length} posts`);
  console.log(`   Published: ${publishCount}`);
  console.log(`   Draft: ${successCount - publishCount}`);
  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
}

migrate();
