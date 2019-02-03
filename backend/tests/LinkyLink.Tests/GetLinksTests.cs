using System;
using Xunit;
using LinkyLink;
using LinkyLink.Tests.Helpers;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AutoFixture;
using FakeItEasy;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Documents;

namespace LinkyLink.Tests
{
    public class GetLinksTest : TestBase
    {
        [Fact]
        public void GetLinks_Emtpy_Collection_Should_Return_NotFound()
        {
            // Arrange
            IEnumerable<LinkBundle> docs = Enumerable.Empty<LinkBundle>();
            ILogger fakeLogger = A.Fake<ILogger>();

            // Act
            IActionResult result = LinkOperations.GetLinks(this.DefaultRequest, docs, "vanityUrl", fakeLogger);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            A.CallTo(fakeLogger)
                .Where(call => call.Method.Name == "Log" && call.GetArgument<LogLevel>("logLevel") == LogLevel.Information)
                .MustHaveHappened();
        }

        [Fact]
        public void GetLinks_Non_Emtpy_Collection_Should_Return_Single_Document()
        {
            // Arrange
            var docs = Fixture.CreateMany<LinkBundle>(1);

            // Act
            IActionResult result = LinkOperations.GetLinks(this.DefaultRequest, docs, string.Empty, A.Dummy<ILogger>());

            // Assert
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(docs.Single(), (result as OkObjectResult).Value);
        }

        [Fact]
        public void GetBundlesForUser_Emtpy_Collection_Should_Return_NotFound()
        {
            // Arrange
            IEnumerable<Document> docs = Enumerable.Empty<Document>();
            ILogger fakeLogger = A.Fake<ILogger>();

            // Act
            IActionResult result = LinkOperations.GetBundlesForUser(this.DefaultRequest, docs, "userId", fakeLogger);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            A.CallTo(fakeLogger)
                .Where(call => call.Method.Name == "Log" && call.GetArgument<LogLevel>("logLevel") == LogLevel.Information)
                .MustHaveHappened();
        }
    }
};
