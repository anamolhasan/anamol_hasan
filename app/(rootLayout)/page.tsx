
import Banner from '@/components/modules/home/Banner'
import AboutPage from './about/page'
import Skills from '@/components/modules/home/Skills'
import Contact from '@/components/modules/home/Contact'
const HomePage = () => {
  return (
    <div className='m-10'>
       <Banner />
       <AboutPage />
       <Skills />
       <Contact />
    </div>
  )
}

export default HomePage