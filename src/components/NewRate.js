import Rating from '@material-ui/lab/Rating'
import React from 'react'

const NewRate = () => {
    return (
        <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            
        </div>
    )
}

export default NewRate
