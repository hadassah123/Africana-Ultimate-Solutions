// Fetch and display Google Blog posts via RSS feed
async function loadGoogleBlogPosts() {
  const blogGridContainer = document.querySelector('.blog-grid-container');
  const rssUrl = 'https://africana-ultimate-solutions.blogspot.com/feeds/posts/default';
  
  // Use CORS proxy to bypass CORS issues
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const fullUrl = proxyUrl + rssUrl;
  
  try {
    console.log('Fetching Google Blog RSS feed...');
    
    const response = await fetch(fullUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Check for parsing errors
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('XML parsing error');
    }
    
    const entries = xmlDoc.getElementsByTagName('entry');
    console.log(`Found ${entries.length} blog posts`);
    
    // Clear existing static cards
    blogGridContainer.innerHTML = '';
    
    // Loop through entries and create cards
    let postsAdded = 0;
    for (let i = 0; i < entries.length && postsAdded < 6; i++) {
      const entry = entries[i];
      
      const title = entry.getElementsByTagName('title')[0]?.textContent || 'Untitled';
      const summary = entry.getElementsByTagName('summary')[0]?.textContent || 'No summary available';
      const published = entry.getElementsByTagName('published')[0]?.textContent || '';
      const link = entry.getElementsByTagName('link')[0]?.getAttribute('href') || '#';
      
      // Format date
      const date = new Date(published);
      const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      // Extract category/label if available
      const category = entry.getElementsByTagName('category')[0]?.getAttribute('term') || 'Blog';
      
      // Clean summary (remove HTML tags)
      const cleanSummary = summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
      
      // Create blog card HTML
      const blogCard = document.createElement('div');
      blogCard.className = 'blog-card';
      blogCard.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 200px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; text-align: center; padding: 20px;">
          📰 Blog Post
        </div>
        <div class="blog-card-content">
          <span class="blog-category">${category}</span>
          <h3>${title}</h3>
          <p class="blog-date">${formattedDate}</p>
          <p>${cleanSummary}</p>
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="read-more-link">Read More</a>
        </div>
      `;
      
      blogGridContainer.appendChild(blogCard);
      postsAdded++;
    }
    
    if (postsAdded === 0) {
      blogGridContainer.innerHTML = '<p style="text-align: center; padding: 40px; grid-column: 1/-1;">No blog posts found. Check back soon!</p>';
    }
    
  } catch (error) {
    console.error('Error loading Google Blog posts:', error);
    // Show fallback message
    blogGridContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
        <p>Unable to load blog posts at the moment. Visit our <a href="https://africana-ultimate-solutions.blogspot.com/" target="_blank">Google Blog</a> directly.</p>
      </div>
    `;
  }
}

// Load posts when DOM is ready
document.addEventListener('DOMContentLoaded', loadGoogleBlogPosts);
