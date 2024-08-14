function NotFound() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            fontSize: '20px'
        }}>
            <div style={{padding: 20}}>
                <h1>404 Not Found</h1>
                <p>The page you're looking for doesn't exist</p>
            </div>
        </div>
    );
}


export default NotFound