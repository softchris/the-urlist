using System;
using Xunit;
using LinkyLink;
using LinkyLink.Tests.Helpers;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace LinkyLink.Tests
{
    public class GetLinksTest : TestBase
    {
        [Fact]
        public void GetLinks_Emtpy_Collection_Should_Return_NotFound()
        {
            //ARRANGE
            IEnumerable<LinkBundle> docs = Enumerable.Empty<LinkBundle>();

            //ACT
            IActionResult result = LinkOperations.GetLinks(this.DefaultRequest, docs, string.Empty, this.DefaultLogger);

            //ASSERT
            Assert.IsType<NotFoundResult>(result);
        }
    }
};
