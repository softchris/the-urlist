using AutoFixture;
using FakeItEasy;
using LinkyLink.Tests.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace LinkyLink.Tests
{
    public class UpdateListTests: TestBase
    {
        [Fact]
        public async Task UpdateList_Request_With_Emtpy_Collection_Should_Return_NotFound()
        {
            // Arrange
            IEnumerable<LinkBundle> docs = Enumerable.Empty<LinkBundle>();
            ILogger fakeLogger = A.Fake<ILogger>();

            // Act
            IActionResult result = await LinkOperations.UpdateList(this.AuthenticatedRequest, docs, null, "vanityUrl", fakeLogger);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            A.CallTo(fakeLogger)
                .Where(call => call.Method.Name == "Log" && call.GetArgument<LogLevel>("logLevel") == LogLevel.Information)
                .MustHaveHappened();
        }
    }
}
