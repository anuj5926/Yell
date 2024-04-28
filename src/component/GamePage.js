import React from 'react'
import Home from './Home'
import History from './History'
import Number from './Number'
import GamePageCss from '../css/GamePageCss'
import NumberModal from './NumberModal'

export default function GamePage() {
    return (
        <>
            <GamePageCss>
                <Home />
                <div className="midPart">
                    <Number />
                    <History />
                </div>
                <NumberModal/>
            </GamePageCss>
        </>
    )
}
