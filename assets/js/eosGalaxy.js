/**
 * Author：zax
 * Time：2018/4/26
 * Description：Description
 */

// import Cookies from 'js-cookie'
// import {pageLoadingHide, axiosAjax, proxyUrl, fomartQuery, getQueryString} from './public/public'
import {pageLoadingHide, isPc} from './public/public'

$(function () {
    pageLoadingHide()
    if (!isPc()) {
        window.location.href = '/eosGalaxyM'
    }
    let nav = [
        {name: '首页', path: 'home'},
        {name: '介绍', path: 'describe'},
        {name: '我们的贡献', path: 'donate'},
        {name: 'Galaxy生态', path: 'ecology'},
        {name: '团队', path: 'team'},
        {name: '联系我们', path: 'contact'}
    ]
    $('a[href *= "#"], area[href *= "#"]').click(function () {
        $('a[href *= "#"]').removeClass('active')
        $(this).addClass('active')
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let $target = $(this.hash)
            $target = ($target.length && $target) || $('[name=' + this.hash.slice(1) + ']')
            if ($target.length) {
                let targetOffset = $target.offset().top
                $('html, body').animate({
                    scrollTop: targetOffset
                }, 500)
                return false
            }
        }
    })

    // 判断滚动高度改变 a 标签状态
    $(window).scroll(function () {
        // 为页面添加页面滚动监听事件
        let $stop = $(window).scrollTop()
        let wst = $stop + 100
        for (let i = 1; i < nav.length; i++) {
            if ($stop <= 300) {
                $('a[href *= "#"]').removeClass('active')
                $('a.home').addClass('active')
            } else if ($stop === $(document).height() - $(window).height()) {
                $('a[href *= "#"]').removeClass('active')
                $('a.contact').addClass('active')
            } else {
                if ($('#' + nav[i].path).offset().top <= wst) {
                    let hash = 'a.' + nav[i].path
                    $('a[href *= "#"]').removeClass('active')
                    $(hash).addClass('active')
                }
            }
        }
    })
})
