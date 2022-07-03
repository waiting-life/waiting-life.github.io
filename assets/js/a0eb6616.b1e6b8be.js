"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9091],{3905:function(e,t,r){r.d(t,{Zo:function(){return m},kt:function(){return d}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),p=l(r),d=i,f=p["".concat(u,".").concat(d)]||p[d]||s[d]||a;return r?n.createElement(f,o(o({ref:t},m),{},{components:r})):n.createElement(f,o({ref:t},m))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=p;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:i,o[1]=c;for(var l=2;l<a;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},8178:function(e,t,r){r.r(t),r.d(t,{assets:function(){return m},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return s}});var n=r(7462),i=r(3366),a=(r(7294),r(3905)),o=["components"],c={},u=void 0,l={unversionedId:"Git",id:"Git",title:"Git",description:"\u6982\u5ff5",source:"@site/docs/Git.md",sourceDirName:".",slug:"/Git",permalink:"/docs/Git",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/Git.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"webpack",permalink:"/docs/webpack"},next:{title:"\u57fa\u7840\u7ec3\u4e60",permalink:"/docs/\u7b97\u6cd5/\u57fa\u7840\u7ec3\u4e60"}},m={},s=[{value:"\u6982\u5ff5",id:"\u6982\u5ff5",level:2},{value:"\u547d\u4ee4",id:"\u547d\u4ee4",level:2},{value:"\u89e3\u51b3\u51b2\u7a81",id:"\u89e3\u51b3\u51b2\u7a81",level:2}],p={toc:s};function d(e){var t=e.components,r=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git revert  # \u6e05\u9664\u4e0a\u4e00\u4e2acommit\u7684\u5185\u5bb9\u5e76\u4e14\u58f0\u79f0\u4e00\u4e2a\u65b0\u7684commit\ngit reset   # git reset --hard head^ \ngit fetch    # origin/main\ngit pull\ngit merge\ngit rebase # \u4fee\u6539commit\u7684\u6307\u5411\n")),(0,a.kt)("h2",{id:"\u6982\u5ff5"},"\u6982\u5ff5"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5de5\u4f5c\u533a")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u6682\u5b58\u533a"))),(0,a.kt)("h2",{id:"\u547d\u4ee4"},"\u547d\u4ee4"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git restore <name> # \u4f7f\u7528\u8be5\u547d\u4ee4\u53ef\u4ee5\u4e22\u5f03\u5de5\u4f5c\u533a\u7684\u4fee\u6539\ngit restore --staged <name> # \u628a\u5df2\u7ecf\u6dfb\u52a0\u5230\u6682\u5b58\u533a\u4f46\u8fd8\u6ca1\u6709commit\u7684\u4ee3\u7801\u4ece\u6682\u5b58\u533a\u4e2d\u53bb\u9664\n\ngit revert head # \u56de\u9000\u5f53\u524dcommit\uff0c\u5e76\u4e14\u751f\u6210\u65b0\u7684commit\n\ngit reset --hard head^ # \u56de\u9000\u5230\u4e0a\u4e00\u4e2acommit\ngit reset head^ # \u56de\u9000\u5230\u4e0a\u4e00\u4e2acommit\uff0c\u533a\u522b\u65f6\u4e4b\u524dcommit\u4fee\u6539\u7684\u5185\u5bb9\u5e76\u4e0d\u4f1a\u6d88\u5931\uff0c\u800c\u662f\u4fdd\u5b58\u5728\u5de5\u4f5c\u76ee\u5f55\u4e2d\ngit reset HEAD test.js # \u628a\u6682\u5b58\u533a\u4e2d\u7684\u4fee\u6539\u56de\u9000\u5230\u5de5\u4f5c\u533a\n\ngit merge <name> # \u5408\u5e76\u5206\u652f\uff0c\u5e76\u4e14\u4f1a\u751f\u6210\u65b0\u7684commit\ngit rebase <name>  # \u53d8\u57fa\uff0c\u4e0d\u4f1a\u751f\u6210\u65b0\u7684commit,head\u4f1a\u6307\u5411\u5f53\u524d\u5206\u652f-\u6307\u5411\u6700\u65b0\u7684commit\n\ngit checkout -- test.js # \u4e22\u5f03\u5de5\u4f5c\u533a\u4e2d\u7684\u4fee\u6539\n\n")),(0,a.kt)("h2",{id:"\u89e3\u51b3\u51b2\u7a81"},"\u89e3\u51b3\u51b2\u7a81"),(0,a.kt)("p",null,"git merge \u7684\u65f6\u5019\u4ea7\u751f\u51b2\u7a81\n\u89e3\u51b3\u51b2\u7a81\u540e\u91cd\u65b0git add\uff0c git commit\ngit rebase\n\u89e3\u51b3\u51b2\u7a81\u540e\u5148git add\uff0cgit rebase --continue"),(0,a.kt)("p",null,"main: 1  3",(0,a.kt)("br",{parentName:"p"}),"\n","test:    2"))}d.isMDXComponent=!0}}]);