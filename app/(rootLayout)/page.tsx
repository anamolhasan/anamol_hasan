
import Banner from '@/components/modules/home/Banner'
// import AboutPage from './about/page'
import Skills from '@/components/modules/home/Skills'
import Contact from '@/components/modules/home/Contact'
import HomeProjects from '@/components/modules/home/HomeProjects'
const HomePage = () => {
  return (
    <div className=''>
       <Banner />
       {/* <AboutPage /> */}
       <Skills />
        <HomeProjects />
       <Contact />
    </div>
  )
}

export default HomePage