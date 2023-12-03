function PageTitle(title) {
    const prevTitle = document.title;
    document.title = `KING JOB - ${title}`;
    return () => {
        document.title = prevTitle
    }
}

export default PageTitle;