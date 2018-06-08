import * as React from 'react';
import './Rating.css';

// interface IRatingProps {

// }

// interface IRatingState {
//     comment: string | null,
//     score: score[]
// }

export default class Rating extends React.Component {
    // constructor(props: IRatingProps) {
    //     super(props)

        // this.state = {
        //     comment: ''
        //     score: [
        //         {id:1, click: false},
        //         {id:2, click: false},
        //         {id:3, click: false},
        //         {id:4, click: false},
        //         {id:5, click: false},
        //         {id:6, click: false},
        //     ]


//     }
// }

    public render() {
    return (
        <div className='num'>
            <div className="rating">
                <p id="rate">Rating:</p>
                <table>
                    <thead>
                        <tr>
                            <th>-3</th>
                            <th>-2</th>
                            <th>-1</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
}