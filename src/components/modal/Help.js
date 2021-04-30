import Card from '../UI/Card'

import classes from './Help.module.css'

export default function Help(props) {
    return (
        <Card>
            <h1 style={{ textAlign: 'center', userSelect: 'none' }}>UNO scorer</h1>
            <h2 style={{ fontFamily: 'monospace', userSelect: 'none' }}>point of cards</h2>
            <Card>
                <table className={`${classes['points-table']}`}>
                    <thead>
                        <tr>
                            <th>Card Name</th>
                            <th>Point</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0 - 9</td>
                            <td>0 - 9</td>
                        </tr>
                        <tr>
                            <td>Skip Card</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Reverse</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Draw 2</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Wild Card</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Wild Draw 2</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Shuffle Hands</td>
                            <td>40</td>
                        </tr>
                    </tbody>
                </table>

                <p>See <a
                    href="https://service.mattel.com/instruction_sheets/42001pr.pdf"
                    style={{ textDecoration: 'none' }}
                    target="_black">this</a></p>
            </Card>
        </Card>
    )
}