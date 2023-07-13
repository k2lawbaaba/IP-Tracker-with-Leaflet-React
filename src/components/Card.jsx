import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DetailsCard(prop) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
  
  <Card sx={{ maxWidth: 260, minHeight:300}}>
      <CardMedia
        component="img"
        height="120"
        image={prop.src}
        alt={prop.alt}
      />
      <CardContent>
        <Typography variant="h5" color="inherit" component='div'>
         {prop.name}
        </Typography>
        <Typography variant='body1' color='inherit'>
            <strong>Cordinates: </strong>[{prop.cord}]<br/>
            <strong>Domain: </strong>{prop.domain}<br/>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='h5' sx={{textDecoration: 'underline'}}> as details</Typography>
          <Typography paragraph>
          
                <strong>asn:</strong>  {prop.asn}<br/>
                <strong>name:</strong> {prop.name} <br/>
                <strong>route:</strong> {prop.route} <br />
                <strong>Domains:</strong> {prop.domains}<br />
                <strong>type:</strong> {prop.type}
                
          </Typography>              
        </CardContent>
      </Collapse>
    </Card>
  );
}
