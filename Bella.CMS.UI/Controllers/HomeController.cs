using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EFSchools.Englishtown.Bella.CMS.Web.Interface.Course;
using EFSchools.Englishtown.Bella.CMS.UI.Controllers.Filters;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers
{
    public class HomeController : Controller
    {
        private ICourseSvc courseSvc;

        public HomeController(ICourseSvc courseSvc)
        {
            this.courseSvc = courseSvc;
        }

        //
        // GET: /Home/
        [BellaCmsAuthorize(LoginType.editor)]
        public ActionResult Index()
        {
            List<CourseResult> allCourse = this.courseSvc.GetAllCouse();
            
            return View(allCourse);
        }

    }
}
