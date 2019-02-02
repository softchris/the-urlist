using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Primitives;

namespace LinkyLink.Tests.Helpers
{
    public abstract class TestBase
    {
        private HttpRequest _defaultRequest;
        public HttpRequest DefaultRequest
        {
            get
            {
                if (_defaultRequest == null)
                {
                    _defaultRequest = new DefaultHttpRequest(new DefaultHttpContext());
                }
                return _defaultRequest;
            }

        }

        private ILogger _defaultLogger;
        public ILogger DefaultLogger
        {
            get
            {
                if (_defaultLogger == null)
                {
                    _defaultLogger = NullLoggerFactory.Instance.CreateLogger(this.GetType());
                }
                return _defaultLogger;
            }
        }



    }
}