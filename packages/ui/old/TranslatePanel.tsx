import React from 'react';

// import './translatePanel.scss';
/* eslint import/no-webpack-loader-syntax: off */
import styles from '!!raw-loader!sass-loader!./translatePanel.scss';

interface Props {

}

const TranslatePanel = (props: any) => {

    const showStyle: { [index: string]: React.CSSProperties } = {
        hidden: {
            bottom: "-18rem",
            height: '16rem',
        },
        half: {
            bottom: 0,
            height: '12rem',
        },
        full: {
            bottom: 0,
            height: '36rem',
            maxHeight: '80%',
        }
    }

    console.log('props', props)

    let show: string = props.show || 'hidden'
    let panelStyle = Object.assign({}, showStyle[show]);

    return (
        <>
            <style>{styles}</style>
            <div id="tp" className="wrp-translate-panel" style={panelStyle}
                onTouchStart={(e) => props.onSlipStart(e, props.show)}
                onTouchMove={props.onSlipMove}
                onTouchEnd={props.onSlipEnd}
                onMouseMove={props.onSlipMove}
                onMouseDown={(e) => props.onSlipStart(e, props.show)}
                onMouseUp={props.onSlipEnd}
                onMouseLeave={props.onSlipEnd}
                onContextMenu={(e) => { e.preventDefault(); return false; }}
                onClick={props.handleClick}
            >
                <div className="wrp-tp-handle"
                    onTouchMove={props.handleDrag}
                    onClick={props.setTranslateY}
                >
                    <div ref={props.handleEl} />
                </div>

                <div className="">{props.original.elements}</div>
                <br />
                <div className="">
                    {(props.status == "completed") ? props.translation.text : ''}
                </div>
                {/* <div class="wrp-tr-scall-mask">
                <div></div>
            </div> */}
            </div>
        </>
    )
}

export default TranslatePanel