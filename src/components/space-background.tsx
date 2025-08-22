export function SpaceBackground() {
    return (
        <div className="bg-space" aria-hidden="true">
            <div className="halo"></div>
            <div className="stars layer1"></div>
            <div className="stars layer2"></div>
            <div className="stars layer3"></div>

            {/* Constelación 1 (morado pastel) */}
            <div className="constellation" style={{'--c':'#B9A6FF'} as React.CSSProperties}>
                <span className="node" style={{'--x':'15%','--y':'30%'} as React.CSSProperties}></span>
                <span className="node" style={{'--x':'25%','--y':'42%'} as React.CSSProperties}></span>
                <span className="node" style={{'--x':'38%','--y':'36%'} as React.CSSProperties}></span>
                <span className="node" style={{'--x':'48%','--y':'50%'} as React.CSSProperties}></span>
                <span className="node" style={{'--x':'60%','--y':'44%'} as React.CSSProperties}></span>

                <span className="link" style={{'--x':'15%','--y':'30%','--len':'11%','--rot':'22deg'} as React.CSSProperties}></span>
                <span className="link" style={{'--x':'25%','--y':'42%','--len':'14%','--rot':'-15deg'} as React.CSSProperties}></span>
                <span className="link" style={{'--x':'38%','--y':'36%','--len':'14%','--rot':'35deg'} as React.CSSProperties}></span>
                <span className="link" style={{'--x':'48%','--y':'50%','--len':'13%','--rot':'-18deg'} as React.CSSProperties}></span>
            </div>

            {/* Constelación 2 (celeste) */}
            <div className="constellation" style={{'--c':'#AEE6FF'} as React.CSSProperties}>
                <span className="node" style={{'--x':'72%','--y':'22%'} as React.CSSProperties}></span>
                <span className="node" style={{'--x':'78%','--y':'31%'} as React.CSSProperties}></span>
                <span className="node" style={{'--x':'84%','--y':'26%'} as React.CSSProperties}></span>

                <span className="link" style={{'--x':'72%','--y':'22%','--len':'7%','--rot':'28deg'} as React.CSSProperties}></span>
                <span className="link" style={{'--x':'78%','--y':'31%','--len':'7%','--rot':'-24deg'} as React.CSSProperties}></span>
            </div>
        </div>
    )
}
