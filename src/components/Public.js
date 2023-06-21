import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">TaskFlow</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Karmiel, TaskFlow lets it's employees see every task they have.</p>
                <p>Every employee has an account created by its manager.</p>
                <p>In your account you will find your tasks, you can see which ones youve completed, keep them or delete them. <br></br> You can assign tasks for other employees too!</p>
                <address className="public__addr">
                   TaskFlow<br />
                    Givat rimonit-ram 5<br />
                    Karmiel, Israel<br />
                    <p>Working 24/7</p>
                    <a href="tel:+972543111631"><b>Call us Now</b></a>
                </address>
                <br />
                <img src={"Logo.png"} alt="" width='40%' height='auto'className='Taskimg'/>
                <p>Owners: David & Gal</p>
                
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public