import { useTransition, useState } from "react"
import "./App.css"
import { NewsCard } from "./component/NewsCard"
import { New } from "./model/New"
import { AIArticleGeneratorButton } from "./component/AIArticleGeneratorButton"
import { LoadingButton } from "./component/LoadingButton"

function App() {
  const [formValues, setFormValues] = useState(new New("", "", ""))
  const [news, setNews] = useState([
    new New(
      "La Switch 2 débarque ! C'est pour bientôt !",
      "https://static.fnac-static.com/multimedia/Images/FR/MDM/f8/23/ab/27993080/3756-1/tsp20250407190943/Pack-Console-Nintendo-Switch-2-le-jeu-Mario-Kart-World-sur-Nintendo-Switch-2.jpg",
      "La frénésie autour de l'univers du jeu vidéo s'apprête à atteindre un nouveau sommet avec l'imminente arrivée de la tant attendue Switch 2. Succédant à une console qui a su révolutionner notre manière de jouer, cette nouvelle itération promet d'élever encore plus haut les standards de l'industrie. Les aficionados de Nintendo, impatients, se préparent déjà à découvrir les innovations technologiques et les expériences de jeu inégalées que cette console de dernière génération s'apprête à offrir. Entre performances accrues et fonctionnalités inédites, la Switch 2 semble avoir tout pour séduire à la fois les puristes et les néophytes. Alors que rumeurs et spéculations alimentent les discussions, une chose est sûre : une nouvelle ère du gaming est sur le point de s'ouvrir, promettant des aventures encore plus immersives et captivantes. Laissez-vous emporter par cette vague d'enthousiasme et préparez-vous à redécouvrir l'art du jeu."
    ),
    new New(
      "Baldur's Gate III, Le nouveau mod officiel va vous rendre fou !",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg?",
      "Dans l'univers des jeux vidéo, rares sont les titres capables de capturer l'essence même de l'aventure comme Baldur's Gate III. Déjà acclamé pour son incroyable profondeur narrative et son système de jeu complexe, ce chef-d'œuvre récemment enrichi d'un nouveau mod officiel promet de repousser encore plus loin les limites de l'expérience ludique. Les amateurs de RPG se réjouissent, car ce mod ne se contente pas d'ajouter des éléments supplémentaires, il transforme littéralement le jeu, introduisant des mécaniques inédites qui redéfinissent les stratégies et augmentent l'intensité des quêtes. Les fans peuvent s'attendre à des défis renouvelés et des histoires captivantes qui viennent étoffer un univers déjà riche et fascinant. Préparez-vous à plonger dans une dimension où chaque décision compte et où l'imprévisible devient votre meilleur allié. Baldur's Gate III n'a jamais été aussi vivant et envoûtant."
    ),
    new New(
      "GTA 6 pourrait voir sa date de sortie décalée... à 2026",
      "https://www.lacremedugaming.fr/wp-content/uploads/creme-gaming/2025/04/gta-6-pourquoi-le-trailer-2-ne-sortira-probablement-pas-en-avril-2025-750x410.jpg",
      "Dans le monde palpitant de Los Santos, où les voitures volent plus bas que les pigeons parisiens, une rumeur aussi explosive qu'un cocktail Molotov en solde fait frémir la toile : l'arrivée tant attendue de GTA 6 pourrait bien jouer à cache-cache jusqu’en 2026 ! Oui, vous avez bien lu, 2026, le futur où nos réfrigérateurs feront le café et où les hoverboards seront toujours en précommande. Imaginez une foule de gamers, la larme à l'œil, entonnant en chœur des chants de désespoir. Mais ne désespérez pas tout de suite, car Rockstar pourrait bien nous surprendre avec une aventure encore plus dingue que la dernière théorie de complot sur Internet. Alors, attachez vos ceintures et préparez-vous à une attente aussi épique qu'une course-poursuite entre Franklin et les stars de TikTok !  🚗💨🎮"
    ),
  ])
  const [loading, startTransition] = useTransition()

  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormValues((prev) => {
      const updatedValues: New = { ...prev, [name]: value }
      return new New(
        updatedValues.title,
        updatedValues.picture,
        updatedValues.content
      )
    })
  }

  const onSubmit = () => {
    startTransition(() => {
      setNews((prev) => {
        const updatedNews: New[] = [...prev]
        updatedNews.push(formValues)
        return updatedNews
      })
      setFormValues(new New("", "", ""))
    })
  }

  function isContentGeneratorEnabled(): boolean {
    return formValues.title && formValues.picture && !formValues.content
      ? true
      : false
  }

  return (
    <main className="container">
      <h1>
        <span>B</span>reaking <span>N</span>ews <span>A</span>pp
      </h1>
      {news.length > 0 && (
        <ul className="articles">
          {news.map((article, index) => (
            <li className="article" key={index}>
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      )}
      <form className="form" action={onSubmit}>
        <h2>
          <span>C</span>reate <span>N</span>ews
        </h2>
        <div className="fields">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              value={formValues.title}
              onChange={handleTextChange}
              type="text"
              id="title"
              name="title"
            />
          </div>
          <div className="field">
            <label htmlFor="picture">Picture</label>
            <input
              value={formValues.picture}
              onChange={handleTextChange}
              type="text"
              id="picture"
              name="picture"
            />
          </div>
          <div className="field textarea">
            <label htmlFor="content">Content</label>
            {isContentGeneratorEnabled() && (
              <div className="aiButton">
                <AIArticleGeneratorButton
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </div>
            )}
            <textarea
              value={formValues.content}
              onChange={handleTextChange}
              id="content"
              name="content"
            ></textarea>
          </div>
        </div>
        <button className="submit" type="submit">
          {loading ? <LoadingButton /> : "Publish"}
        </button>
      </form>
    </main>
  )
}

export default App
