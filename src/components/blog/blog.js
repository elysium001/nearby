import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import RecentTwitterPosts from './RecentTwitterPosts';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import NewsPosts from './NewsPosts';

const sections = [
  { title: 'Social Media', url: '#social' },
  { title: 'News', url: '#news' },
  { title: 'Food', url: '#food' },
  { title: 'Events', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  date: 'Nov 12',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
  imageLabel: 'Image Text',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];



const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {

  // const [ terms, setTerms ] = React.useState([]);
  const [ currentPage, setCurrentPage ] = React.useState('Social');
  const [ socialPosts, setSocialPosts ] = React.useState();
  const [ newsPosts, setNewsPosts ] = React.useState();

  React.useEffect(()=>{
    // let t = []
    // for (let index = 0; index < posts.length; index++) {
    //   const md = posts[index];
    //   fetch(md).then((response) => response.text()).then((text) => {
    //     t.push(text)
    //     if(index === posts.length - 1){
    //       setTerms(t)
    //     }
    //   })
    // }
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const SOCIAL_API = "http://wp-test.test/wp-json/nearby/v1";

    fetch(SOCIAL_API + '/social/place/albuquerque').then((res)=>res.json()).then((data)=>{
      const dataObj = data
      const socialposts = data?.social?.data?.map(({id, text, created_at, attachments = {}, entities: {mentions = [] }})=>{
        const media = dataObj?.social?.includes?.media
        const user = mentions && `@${mentions[0]?.username}`;
        const { media_keys } = attachments
        const time = new Date(created_at);
        const obj = {
          title: user,
          id: id,
          date: monthNames[time.getMonth()] + ' ' + time.getDate(),
          description: text.substring(0,200) + '...',
          image: media_keys && media.filter((m)=>m.media_key === media_keys[0])[0].url,
          imageLabel: 'Image Text',
        }
        return obj;
      })
      setSocialPosts(socialposts || [])
    })

    fetch(SOCIAL_API + '/news/place/albuquerque').then((res)=>res.json()).then((data)=>{

      const news = data?.news?.map(({title, date, content, url, source_url, source_link})=>{
        const obj = {
          title: title,
          date: date,
          description: content.substring(0,200) + '...',
          url: url,
          source_url: source_url,
          source_link: source_link,
        }
        return obj;
      })
      setNewsPosts(news)
    })

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Nearby" sections={sections} onLinkClick={(val)=>setCurrentPage(val)}/>
        <main style={{minHeight: '80vh'}}>
          {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
          {currentPage === 'Social' && <h2>Social Media Feed</h2>}
          {currentPage === 'News' && <h2>News Feed</h2>}
          <Grid container spacing={4}>
            {(socialPosts && currentPage === 'Social') && socialPosts.map((post, i) => (
              post.title !== '@undefined' && <RecentTwitterPosts key={i} post={post} />
            ))}
            {(newsPosts && currentPage === 'News') && newsPosts.map((post, i) => (
              <NewsPosts key={i} post={post} />
            ))}
          </Grid>
          {/* <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={terms} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid> */}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}