import Vue from "vue";
import 'vant/lib/index.css';

import { 
        Button,
        Tabbar,
        TabbarItem,
        Icon,
        NavBar,
        SubmitBar,
        Checkbox,
        CheckboxGroup,
        Search,
        Swipe,
        SwipeItem,
        Grid,
        GridItem,
        Image,
        Divider,
        Lazyload,
        PullRefresh,
        List,
        NoticeBar,
        GoodsAction,
        GoodsActionButton,
        GoodsActionIcon,
        } from 'vant';

Vue.use(Button);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(NoticeBar);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Lazyload);
Vue.use(Image);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);