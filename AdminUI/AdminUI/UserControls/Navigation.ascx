﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Navigation.ascx.cs" Inherits="AdminUI.UserControls.Navigation" %>
        
<div id="nav-wrapper">
    <ul id="nav"
        data-ng-controller="NavCtrl"
        data-slim-scroll
        data-collapse-nav
        data-highlight-active>
        <li><a href="#/dashboard"> <i class="fa fa-dashboard"></i><span data-i18n="Dashboard"></span> </a></li>
        <li>
            <a href="#/ui"><i class="fa fa-magic"></i><span data-i18n="UI Kit"></span></a>
            <ul>
                <li><a href="#/ui/buttons"><i class="fa fa-caret-right"></i><span data-i18n="Buttons"></span></a></li>
                <li><a href="#/ui/typography"><i class="fa fa-caret-right"></i><span data-i18n="Typography"></span></a></li>
                <li><a href="#/ui/widgets"><i class="fa fa-caret-right"></i><span data-i18n="Widgets"></span> <span class="badge badge-success">13</span></a></li>
                <li><a href="#/ui/grids"><i class="fa fa-caret-right"></i><span data-i18n="Grids"></span></a></li>
                <li><a href="#/ui/icons"><i class="fa fa-caret-right"></i><span data-i18n="Icons"></span></a></li>
                <li><a href="#/ui/components"><i class="fa fa-caret-right"></i><span data-i18n="Components"></span> <span class="badge badge-danger">17</span></a></li>
                <li><a href="#/ui/timeline"><i class="fa fa-caret-right"></i><span data-i18n="Timeline"></span></a></li>
                <li><a href="#/ui/nested-lists"><i class="fa fa-caret-right"></i><span data-i18n="Nested Lists"></span></a></li>
                <li><a href="#/ui/pricing-tables"><i class="fa fa-caret-right"></i><span data-i18n="Pricing Tables"></span></a></li>
            </ul>
        </li>
        <li>
            <a href="#/pages"><i class="fa fa-file-text-o"></i><span data-i18n="Pages"></span></a>
            <ul>
                <li><a href="#/pages/signin"><i class="fa fa-caret-right"></i><span data-i18n="Sign in"></span></a></li>
                <li><a href="#/pages/signup"><i class="fa fa-caret-right"></i><span data-i18n="Sign Up"></span></a></li>
                <li><a href="#/pages/forgot"><i class="fa fa-caret-right"></i><span data-i18n="Forgot Password"></span></a></li>
                <li><a href="#/pages/lock-screen"><i class="fa fa-caret-right"></i><span data-i18n="Lock Screen"></span></a></li>
                <li><a href="#/pages/profile"><i class="fa fa-caret-right"></i><span data-i18n="User Profile"></span></a></li>
                <li><a href="#/pages/404"><i class="fa fa-caret-right"></i>404 <span data-i18n="Error"></span></a></li>
                <li><a href="#/pages/500"><i class="fa fa-caret-right"></i>500 <span data-i18n="Error"></span></a></li>
                <li><a href="#/pages/blank"><i class="fa fa-caret-right"></i><span data-i18n="Blank Page"></span></a></li>
                <li><a href="#/pages/services"><i class="fa fa-caret-right"></i><span data-i18n="Services"></span></a></li>
                <li><a href="#/pages/about"><i class="fa fa-caret-right"></i><span data-i18n="About"></span></a></li>
                <li><a href="#/pages/contact"><i class="fa fa-caret-right"></i><span data-i18n="Contact"></span></a></li>
                <li><a href="#/pages/invoice"><i class="fa fa-caret-right"></i><span data-i18n="Invoice"></span></a></li>
            </ul>
        </li>
        <li>
            <a href="#/table"><i class="fa fa-table"></i><span data-i18n="Tables"></span></a>
            <ul>
                <li><a href="#/tables/static"><i class="fa fa-caret-right"></i><span data-i18n="Static Tables"></span></a></li>
                <li><a href="#/tables/responsive"><i class="fa fa-caret-right"></i><span data-i18n="Responsive Tables"></span></a></li>
                <li><a href="#/tables/dynamic"><i class="fa fa-caret-right"></i><span data-i18n="Dynamic Tables"></span></a></li>
            </ul>
        </li>
        <li>
            <a href="#/form"><i class="fa fa-pencil"></i><span data-i18n="Forms"></span></a>
            <ul>
                <li><a href="#/forms/elements"><i class="fa fa-caret-right"></i><span data-i18n="Form Elements"></span> <span class="badge badge-warning">14</span></a></li>
                <li><a href="#/forms/validation"><i class="fa fa-caret-right"></i><span data-i18n="Form Validation"></span></a></li>
                <li><a href="#/forms/wizard"><i class="fa fa-caret-right"></i><span data-i18n="Form Wizard"></span></a></li>
                <li><a href="#/forms/layouts"><i class="fa fa-caret-right"></i><span data-i18n="Form Layouts"></span></a></li>
            </ul>
        </li>
       <li>
            <a href="#/charts"><i class="fa fa-bar-chart-o"></i><span data-i18n="Charts"></span></a>
            <ul>
                <li><a href="#/charts/morris"><i class="fa fa-caret-right"></i>Morris <span data-i18n="Charts"></span></a></li>
                <li><a href="#/charts/flot"><i class="fa fa-caret-right"></i>Flot <span data-i18n="Charts"></span></a></li>
                <li><a href="#/charts/others"><i class="fa fa-caret-right"></i>Other <span data-i18n="Charts"></span></a></li>
            </ul>
        </li>
        <li>
            <a href="#/maps"><i class="fa fa-map-marker"></i><span data-i18n="Maps"></span></a>
            <ul>
                <li><a href="#/maps/gmap"><i class="fa fa-caret-right"></i><span data-i18n="Google Map"></span></a></li>
                <li><a href="#/maps/jqvmap"><i class="fa fa-caret-right"></i><span data-i18n="Vector Map"></span></a></li>
            </ul>
        </li>
        <li class="nav-task">
            <a href="#/tasks">
                <i class="fa fa-tasks"></i><span data-i18n="Tasks"></span>
                <span class="badge badge-info main-badge"
                      data-ng-show="taskRemainingCount > 0">{{taskRemainingCount}}</span>
            </a>
        </li>
        <li>
            <a href="#/mail"><i class="fa fa-envelope-o"></i><span data-i18n="Mail"></span></a>
            <ul>
                <li><a href="#/mail/inbox"><i class="fa fa-caret-right"></i><span data-i18n="Inbox"></span></a></li>
                <li><a href="#/mail/compose"><i class="fa fa-caret-right"></i><span data-i18n="Compose"></span></a></li>
                <li><a href="#/mail/single"><i class="fa fa-caret-right"></i><span data-i18n="Single Mail"></span></a></li>
            </ul>
        </li>
    </ul>
</div>