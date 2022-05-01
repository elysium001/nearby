import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';

function RecentTwitterPosts(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <TwitterIcon />
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post?.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post?.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post?.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              <a href={`https://twitter.com/twitter/status/${post.id}`}>Continue reading...</a>
            </Typography>
          </CardContent>
          {post.image && <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

RecentTwitterPosts.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecentTwitterPosts;