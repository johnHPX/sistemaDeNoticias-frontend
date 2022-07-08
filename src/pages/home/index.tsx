import axios from "axios"
import { useEffect, useState } from "react"
import Button from "../../components/button"
import CardNews from "../../components/cardNews"
import Footer from "../../components/footer"
import Header from "../../components/header"
import { MenuLink } from "../../components/navBar"
import "./style.css"

interface Content {
    cid: string
    subTitulo: string
    texto: string
}

interface News {
    id: string
    titulo: string
    conteudos: Content[]
    categoria: string
}

export interface DataNews {
    count: Number
    noticias: News[]
    mid: string
}

// Home principal página da aplicação, aqui serão exibidas as notícias.
function Home() {
    const [urlAPI, setUrlAPI] = useState<string>("http://localhost:4083/noticias?mid=ok")
    const [news, setNews] = useState<DataNews>({ count: 0, mid: "", noticias: [] })

    useEffect(() => {
        axios.get(urlAPI).then((response) => {
            setNews(response.data)
        })
    }, [])

    const menuLinks: MenuLink[] = [{
        url: "/",
        text: "Home"
    }, {
        url: "/category",
        text: "register category"
    }, {
        url: "/news",
        text: "register news"
    }, {
        url: "/about",
        text: "about"
    }]

    return (
        <div className="home">
            <Header links={menuLinks} textSearch="search by title category" urlAPI={urlAPI} dataAPI={setNews} entityAPI="news" />

            <main className="home-main">

                {
                    (news.count == 0) ?
                        <div className="no-content">
                            <h2>Ops! nenhuma notícia encontrada!</h2>
                            <h3>Parece que não foi cadastrada nenhuma notícia! cadastre uma!</h3>
                            <Button path="/" textButton="Cadastre uma Notícia" />
                        </div>
                        :
                        <div className="container-news">
                            {
                                news.noticias.map(value => {
                                    return (
                                        <CardNews key={value.id} />
                                    )
                                })
                            }
                        </div>
                }
            </main>

            <Footer />
        </div>
    )
}

export default Home