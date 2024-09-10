export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-row" style={{ color: '#000', margin: 0 }}>
                <h1
                    style={{
                        borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                        display: 'inline-block',
                        margin: '0 20px 0 0',
                        padding: '0 23px 0 0',
                        fontSize: '24px',
                        fontWeight: '500',
                        verticalAlign: 'top',
                        lineHeight: '49px',
                    }}
                >
                    404
                </h1>
                <div>
                    <h2
                        style={{
                            display: 'inline-block',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '49px',
                            margin: 0,
                        }}
                    >
                        This page could not be found.
                    </h2>
                </div>
            </div>
        </div>
    );
}
