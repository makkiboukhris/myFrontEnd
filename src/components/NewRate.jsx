import { SentimentVerySatisfiedOutlined } from '@material-ui/icons'
import Rating from '@material-ui/lab/Rating'
import React from 'react'

const NewRate = (props) => {
    return (
        <div>
            <Rating name="half-rating" defaultValue={props.value} precision={0.5} onChange={(e)=>props.setValue(e.target.value)} />           
        </div>
    )
}

export default NewRate
