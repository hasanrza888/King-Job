import { Rating } from '@mui/material';

function StarRating({rating_count}) {
    return ( 
        <div className="star_rating_container">
            <Rating name="half-rating-read" defaultValue={rating_count} precision={0.1} size='small' readOnly />
        </div>
     );
}

export default StarRating;