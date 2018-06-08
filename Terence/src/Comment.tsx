import * as React from 'react';
import './Comment.css';


export default class Comment extends React.Component {
    public render() {
        return (
            <div className="comment">
                <div className="content">
                    <p>Comment:</p>
                    <input type="text" value="" className="text" />
                </div>
                <div className="submit">
                    <button>Submit</button>
                </div>
            </div>
        )
    }
}

