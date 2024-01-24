import Game from "./components/Game";
import { Toaster } from 'react-hot-toast';
import Menu from "./components/Menu";
import { vstack } from "../styled-system/patterns";
import { css } from "../styled-system/css";

const section = vstack({
  bgColor: 'red.600',
  color: 'white',
})

const div = vstack({
  p: '14px 22px',
  justifyContent: 'center',
})

const h2 = css({
  fontSize: '26px',
  w: 'full',
  textAlign: 'left'
})

const p = css({
  fontSize: '16px',
  lineHeight: '1.6',
  py: '8px'
})

function App() {

  return (
    <>
      <Toaster
        position='top-center'
      reverseOrder={false}
      toastOptions={{
        duration: 5000
        }}
      />
      <Menu />
      <section className={section}>
        <div className={div}>
          <h2 className={h2}>Rules</h2>
          <p className={p}>
            In the classic game of Rock, Paper, Scissors, two players simultaneously choose one of three hand gestures: rock, paper, or scissors. The rules are simple: rock crushes
            scissors, scissors cut paper, and paper covers rock. The outcome is determined by the interactions between these elements, creating a balanced and cyclic dynamic where
            each choice has a distinct advantage over one option and a vulnerability to another. The game is often used for quick decision-making and resolving simple disputes.
          </p>
          <p className={p}>
            In the digital version of Rock, Paper, Scissors against a computer opponent, players have the convenience of selecting their choice with a button press. The computer's move
            is generated randomly after the player makes their selection. The same fundamental rules apply, with the digital interface simplifying the process while maintaining the core
            mechanics of the classic hand game. Players can enjoy a quick and fun experience without the need for verbal counting or gestures.
          </p>
        </div>
        <div className={div}>
          <h2 className={h2}>Origins</h2>
          <p className={p}>
            The first known mention of the game was in the book Wuzazu [zh] by the Ming-dynasty writer Xie Zhaozhe [zh] (fl. c. 1600), who wrote that the game dated back to the time
            of the Han dynasty (206 BCE – 220 CE). In the book, the game was called shoushiling. Li Rihua's book Note of Liuyanzhai also mentions this game, calling it shoushiling
            (t. 手勢令; s. 手势令), huozhitou (t. 豁指頭; s. 豁指头), or huaquan (划拳).
          </p>
          <p className={p}>
            From China the game was brought to Japan. Throughout Japanese history there are frequent references to sansukumi-ken, meaning ken (fist) games "of the three who are afraid
            of one another" (i.e. A beats B, B beats C, and C beats A).
          </p>
          <p className={p}>
            The most popular sansukumi-ken game in Japan was kitsune-ken (狐拳). In this game, a supernatural fox called a kitsune (狐) defeats the village head, the village head (庄屋)
            defeats the hunter, and the hunter (猟師) defeats the fox. Kitsune-ken, unlike mushi-ken or rock–paper–scissors, requires gestures with both hands.
          </p>
        </div>
      </section>
    </>
  )
}

export default App
