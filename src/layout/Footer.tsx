const Footer = () => {
    return (
        <footer className="border-t p-8 text-center text-muted-foreground">
            <h3 className="flex gap-0.5 justify-center text-xl">
                <strong>Spark</strong>
                <img
                    src="/footer-paw.svg"
                    alt="Footer icon"
                    width={16}
                    height={16}
                />
                <span className="font-normal">nomy</span>
            </h3>
            <p>sparking the creator economy</p>
        </footer>
    )
}

export default Footer
