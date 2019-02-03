using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Primitives;
using AutoFixture;
using AutoFixture.AutoFakeItEasy;
using System.Security.Claims;

namespace LinkyLink.Tests.Helpers
{
    public abstract class TestBase
    {
        protected IFixture Fixture { get; set; }

        public TestBase()
        {
            this.Fixture = new Fixture()
                .Customize(new AutoFakeItEasyCustomization());
        }

        private HttpRequest _defaultRequest;
        public HttpRequest DefaultRequest
        {
            get
            {
                if (_defaultRequest == null)
                {
                    ClaimsIdentity identity = new ClaimsIdentity("WebJobsAuthLevel");
                    identity.AddClaim(new Claim(Constants.FunctionsAuthLevelClaimType, "Function"));
                    identity.AddClaim(new Claim(Constants.FunctionsAuthLevelKeyNameClaimType, "default"));

                    ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                    var context = new DefaultHttpContext
                    {
                        User = principal
                    };

                    _defaultRequest = new DefaultHttpRequest(context);
                }
                return _defaultRequest;
            }

        }
    }
}