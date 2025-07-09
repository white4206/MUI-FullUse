import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconSelect from '@/components/IconSelect';
import CustomInput from '@/components/CustomInput';
import { useNotification } from '@/context/hooks';
import { Box } from '@mui/material';

const Article = () => {
    const handleSelectIcon = (icon: string) => {
        console.log(icon);
    };
    const notify = useNotification();

    return (
        <Box overflow="hidden">
            <Card sx={{ maxWidth: 345, m: 2 }}>
                <CardMedia sx={{ height: 140 }} image="https://mui.com/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            <CustomInput sx={{ m: 2 }} label="自定义输入框" />
            <IconSelect sx={{ m: 2 }} onIconSelect={handleSelectIcon} />
            <Button sx={{ m: 2 }} onClick={() => notify({ content: '我是通知' })}>
                通知
            </Button>
        </Box>
    );
};
export default Article;
