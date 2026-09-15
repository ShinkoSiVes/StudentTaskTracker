using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentTaskTracker.Controllers
{
    public class ModuleController : Controller
    {
        public ActionResult MainPage()
        {
            ViewBag.WelcomeMessage = "Welcome to my Student Task Tracker!";
            return View();
        }

        public ActionResult AboutPage()
        {
            return View();
        }

        public ActionResult LoginPage()
        {
            ViewBag.HideHeader = true;
            return View();
        }

        public ActionResult RegistrationPage()
        {
            ViewBag.HideHeader = true;
            return View();
        }

        public ActionResult ContactsPage()
        {
            return View();
        }

    }
}