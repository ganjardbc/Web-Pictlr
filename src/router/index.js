import Vue from 'vue'
import Router from 'vue-router'

// welcome
import Welcome from '@/components/welcome/Index'

// feeds
import Feeds from '@/components/feeds/Index'

// auth
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

// explore
import Explore from '@/components/explore/Index'
import ExploreExplore from '@/components/explore/Explore'
import ExploreTopics from '@/components/explore/Topic'

// topics
import MoreTopics from '@/components/explore/Discover'

// following
import Following from '@/components/following/Index'
import FollowingPost from '@/components/following/Design'
import FollowingCanvas from '@/components/following/Canvas'

// user
import User from '@/components/user/Index'
import UserCanvas from '@/components/user/Canvas'
import UserDesign from '@/components/user/Design'
import UserSave from '@/components/user/Save'
import UserOverviews from '@/components/user/Overview'
import UserBasic from '@/components/user/setting/Basic'
import UserProfile from '@/components/user/setting/Profile'
import UserPassword from '@/components/user/setting/Password'

//canvas
import CanvasIndex from '@/components/canvas/Index'
import CanvasCreate from '@/components/canvas/Create'
import CanvasEdit from '@/components/canvas/Edit'

// post
import PostIndex from '@/components/post/Index'
import PostCreate from '@/components/post/Create'
import PostEdit from '@/components/post/Edit'
import PostSave from '@/components/post/Save'

//notifications
import Notifications from '@/components/notifications/Index'

//search
import Search from '@/components/search/Index'
import SearchDesign from '@/components/search/Design'
import SearchCanvas from '@/components/search/Canvas'
import SearchUser from '@/components/search/User'

//tags
import TagIndex from '@/components/tags/Index'

//others
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
  routes: [

    
    
    // feeds
    {
      path: '/',
      name: 'home',
      component: Feeds
    },

    
    
    // welcome
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },

    
    
    // auth
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },


    // explore
    {
      path: '/trendings',
      name: 'trendings',
      components: {
          default: Explore,
          content: ExploreExplore
      }
    },
    {
      path: '/fresh',
      name: 'fresh',
      components: {
          default: Explore,
          content: ExploreExplore
      }
    },
    {
      path: '/populars',
      name: 'populars',
      components: {
          default: Explore,
          content: ExploreExplore
      }
    },
    {
      path: '/timelines',
      name: 'timelines',
      components: {
          default: Explore,
          content: ExploreExplore
      }
    },
    {
      path: '/news/:idtags',
      name: 'topics',
      components: {
          default: Explore,
          content: ExploreTopics
      }
    },
    {
      path: '/more-topics',
      name: 'more-topics',
      components: {
          default: MoreTopics
      }
    },


    // Compose
    {
      path: '/compose',
      redirect: '/compose/post',
    },
    {
      path: '/compose/post',
      name: 'create-post',
      components: {
          content: PostCreate,
      }
    },
    {
      path: '/compose/canvas',
      name: 'create-canvas',
      components: {
          content: CanvasCreate,
      }
    },

    // search
    {
      path: '/search',
      name: 'search',
      components: {
          content: Search,
          design: SearchDesign
      }
    },
    {
      path: '/search/posts/:ctr',
      name: 'search-posts',
      components: {
          content: Search,
          design: SearchDesign
      }
    },
    {
      path: '/search/canvas/:ctr',
      name: 'search-canvas',
      components: {
          content: Search,
          design: SearchCanvas
      }
    },
    {
      path: '/search/users/:ctr',
      name: 'search-users',
      components: {
          content: Search,
          design: SearchUser
      }
    },


    // tags
    {
      path: '/tags/:ctr',
      name: 'index-tags',
      components: {
          content: TagIndex
      }
    },


    // following
    {
      path: '/following',
      name: 'following',
      redirect: {name: 'post-following'}
    },
    {
      path: '/following/posts',
      name: 'post-following',
      components: {
          default: Following,
          content: FollowingPost,
      }
    },
    {
      path: '/following/canvas',
      name: 'canvas-following',
      components: {
          default: Following,
          content: FollowingCanvas,
      }
    },


    // notifications
    {
      path: '/notifications',
      name: 'notif',
      components: {
          content: Notifications,
      }
    },
    {
      path: '/notifications/:ctr',
      name: 'notifCtr',
      components: {
          content: Notifications,
      }
    },

    
    
    // user
    {
      path: '/:username',
      name: 'user',
      redirect: '/:username/posts'
    },
    {
      path: '/:username/overviews',
      name: 'user-overviews',
      components: {
          default: User,
          content: UserOverviews,
      }
    },
    {
      path: '/:username/canvas',
      name: 'user-canvas',
      components: {
          default: User,
          content: UserCanvas,
      }
    },
    {
      path: '/:username/posts',
      name: 'user-posts',
      components: {
          default: User,
          content: UserDesign,
      }
    },
    {
      path: '/:username/saved',
      name: 'user-saved',
      components: {
          default: User,
          content: UserSave,
      }
    },
    {
      path: '/:username/canvas/:idcanvas',
      name: 'visit-canvas',
      components: {
          content: CanvasIndex,
      }
    },
    {
      path: '/:username/canvas/:idcanvas/edit',
      name: 'edit-canvas',
      components: {
          content: CanvasEdit,
      }
    },

    
    
    
    // setting
    {
      path: '/me/setting',
      name: 'user-setting',
      redirect: '/me/setting/basic',
    },
    {
      path: '/me/setting/basic',
      name: 'setting-basic',
      components: {
          content: UserBasic,
      }
    },
    {
      path: '/me/setting/profile',
      name: 'setting-profile',
      components: {
          content: UserProfile,
      }
    },
    {
      path: '/me/setting/password',
      name: 'setting-password',
      components: {
          content: UserPassword,
      }
    },

    // post
    {
      path: '/post/:idbookmark',
      name: 'index-post',
      components: {
          content: PostIndex,
      }
    },
    {
      path: '/post/:idbookmark/save',
      name: 'save-post',
      components: {
          fresh: PostSave,
      }
    },
    {
      path: '/post/:idbookmark/edit',
      name: 'edit-post',
      components: {
          content: PostEdit,
      }
    },


    
    
    // others
    {
      path: '/*',
      name: 'Not Found',
      component: NotFound
    }


  ],
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          return {x: 0, y: 0}
      }
  }
})
