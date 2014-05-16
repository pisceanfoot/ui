﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PageHeader.ascx.cs" Inherits="AdminUI.UserControls.PageHeader" %>
<div id="header" class="top-header">
<div class="clearfix">
    <!-- Logo -->
    <div class="logo">
        <a href="#/">
            <!-- <span class="logo-icon glyphicon glyphicon-fire"></span> -->
            <span class="ng-binding">Squardddde</span>
        </a>
    </div>

    <!-- needs to be put after logo to make it working-->
    <div class="menu-button" toggle-off-canvas="">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </div>

    <div class="top-nav">
        <ul class="nav-left list-unstyled">
            <li>
                <a href="#/" data-toggle-min-nav="" class="toggle-min"><i class="fa fa-bars"></i></a>
            </li>
<!--             <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-columns"></i></a>
                <ul class="dropdown-menu dropdown-dark with-arrow">
                    <li> <a href="javascript:;"><span data-i18n="Boxed Layout"></span></a> </li>
                    <li> <a href="javascript:;"><span data-i18n="Full Width Layout"></span></a> </li>
                    <li> <a href="javascript:;"><span data-i18n="Collapsed Menu"></span></a> </li>
                    <li> <a href="javascript:;"><span data-i18n="Horizontal Menu"></span></a> </li>
                    <li> <a href="javascript:;"><span data-i18n="Vertical Menu"></span></a> </li>
                </ul>
            </li> -->
            <li class="dropdown text-normal nav-profile">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="images/g1.jpg" alt="" class="img-circle img30_30">
                    <span class="hidden-xs">
                        <span data-i18n="Lisa Doe">Lisa Doe</span>
                    </span>
                </a>
                <ul class="dropdown-menu dropdown-dark with-arrow">
                    <li>
                        <a href="#/pages/profile">
                            <i class="fa fa-user"></i>
                            <span data-i18n="My Profile">My Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/tasks">
                            <i class="fa fa-check"></i>
                            <span data-i18n="My Tasks">My Tasks</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/pages/lock-screen">
                            <i class="fa fa-lock"></i>
                            <span data-i18n="Lock">Lock</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/pages/signin">
                            <i class="fa fa-sign-out"></i>
                            <span data-i18n="Log Out">Log Out</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="dropdown langs text-normal ng-scope" data-ng-controller="LangCtrl">
                <a href="javascript:;" class="dropdown-toggle active-flag" data-toggle="dropdown">
                    <div class="flag flags-american"></div>
                </a>
                <ul class="dropdown-menu dropdown-dark with-arrow list-langs" role="menu">
                    <li data-ng-show="lang !== 'English' " class="ng-hide">
                        <a href="javascript:;" data-ng-click="setLang('English')"><div class="flag flags-american"></div> English</a></li>
                    <li data-ng-show="lang !== 'Español' " class="">
                        <a href="javascript:;" data-ng-click="setLang('Español')"><div class="flag flags-spain"></div> Español</a></li>
                    <li data-ng-show="lang !== '日本語' " class="">
                        <a href="javascript:;" data-ng-click="setLang('日本語')"><div class="flag flags-japan"></div> 日本語</a></li>
                    <li data-ng-show="lang !== '中文' " class="">
                        <a href="javascript:;" data-ng-click="setLang('中文')"><div class="flag flags-china"></div> 中文</a></li>
                    <li data-ng-show="lang !== 'Deutsch' " class="">
                        <a href="javascript:;" data-ng-click="setLang('Deutsch')"><div class="flag flags-germany"></div> Deutsch</a></li>
                    <li data-ng-show="lang !== 'français' " class="">
                        <a href="javascript:;" data-ng-click="setLang('français')"><div class="flag flags-france"></div> français</a></li>
                    <li data-ng-show="lang !== 'Italiano' " class="">
                        <a href="javascript:;" data-ng-click="setLang('Italiano')"><div class="flag flags-italy"></div> Italiano</a></li>
                    <li data-ng-show="lang !== 'Portugal' " class="">
                        <a href="javascript:;" data-ng-click="setLang('Portugal')"><div class="flag flags-portugal"></div> Portugal</a></li>
                    <li data-ng-show="lang !== 'Русский язык' " class="">
                        <a href="javascript:;" data-ng-click="setLang('Русский язык')"><div class="flag flags-russia"></div> Русский язык</a></li>
                    <li data-ng-show="lang !== '한국어' " class="">
                        <a href="javascript:;" data-ng-click="setLang('한국어')"><div class="flag flags-korea"></div> 한국어</a></li>
                </ul>
            </li>
<!--             <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                    <span class="fa fa-magic nav-icon"></span>
                </a>
                <ul class="dropdown-menu pull-right color-switch" data-ui-color-switch>
                    <li><a href="javascript:;" class="color-option color-some_color" data-style="some_color"></a></li>
                </ul>
            </li> -->

        </ul> 

        <ul class="nav-right pull-right list-unstyled">
            <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle bg-orange" data-toggle="dropdown">
                    <i class="fa fa-comment-o"></i>
                    <span class="badge badge-info">2</span>
                </a>
                <div class="dropdown-menu pull-right with-arrow panel panel-default">
                    <div class="panel-heading">
                        You have 2 messages.
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-info"><i class="fa fa-comment-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">Jane sent you a message</span>
                                    <span class="text-muted">3 hours ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-danger"><i class="fa fa-comment-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">Lynda sent you a mail</span>
                                    <span class="text-muted">9 hours ago</span>
                                </div>
                            </a>
                        </li>                       
                    </ul>
                    <div class="panel-footer">
                        <a href="javascript:;">Show all messages.</a>
                    </div>
                </div>
            </li>
            <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle bg-warning" data-toggle="dropdown">
                    <i class="fa fa-envelope-o"></i>
                    <span class="badge badge-info">3</span>
                </a>
                <div class="dropdown-menu pull-right with-arrow panel panel-default">
                    <div class="panel-heading">
                        You have 3 mails.
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-warning"><i class="fa fa-envelope-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">Lisa sent you a mail</span>
                                    <span class="text-muted block">2min ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-info"><i class="fa fa-envelope-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">Jane sent you a mail</span>
                                    <span class="text-muted">3 hours ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-success"><i class="fa fa-envelope-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">Lynda sent you a mail</span>
                                    <span class="text-muted">9 hours ago</span>
                                </div>
                            </a>
                        </li>                       
                    </ul>
                    <div class="panel-footer">
                        <a href="javascript:;">Show all mails.</a>
                    </div>
                </div>
            </li>
            <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle bg-success" data-toggle="dropdown">
                    <i class="fa fa-bell-o nav-icon"></i>
                    <span class="badge badge-info">3</span>
                </a>
                <div class="dropdown-menu pull-right with-arrow panel panel-default">
                    <div class="panel-heading">
                        You have 3 notifications.
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-success"><i class="fa fa-bell-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">New tasks needs to be done</span>
                                    <span class="text-muted block">2min ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-info"><i class="fa fa-bell-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">Change your password</span>
                                    <span class="text-muted">3 hours ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="javascript:;" class="media">
                                <span class="pull-left media-icon">
                                    <span class="square-icon sm bg-danger"><i class="fa fa-bell-o"></i></span>
                                </span>
                                <div class="media-body">
                                    <span class="block">New feature added</span>
                                    <span class="text-muted">9 hours ago</span>
                                </div>
                            </a>
                        </li>                       
                    </ul>
                    <div class="panel-footer">
                        <a href="javascript:;">Show all notifications.</a>
                    </div>
                </div>
            </li>
            <li>
                <a href="#/tasks" class="bg-info">
                    <i class="fa fa-tasks"></i>
                </a>
            </li>
        </ul>
    </div>
</div>
</div>
