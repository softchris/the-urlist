using AutoFixture;
using FakeItEasy;
using LinkyLink.Tests.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace LinkyLink.Tests
{
    public class SaveLinksTests: TestBase
    {
        [Fact]
        public async Task SaveLinks_Invalid_Payload_Returns_BadRequest() {
            // Arrange
            ILogger fakeLogger = A.Fake<ILogger>();
            HttpRequest req = this.DefaultRequest;
            req.Body = this.GetHttpRequestBodyStream("");
            IAsyncCollector<LinkBundle> collector = A.Fake<IAsyncCollector<LinkBundle>>();

            // Act
            IActionResult result = await LinkOperations.SaveLinks(req, collector, fakeLogger);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            A.CallTo(() => collector.AddAsync(A<LinkBundle>.Ignored, CancellationToken.None)).MustNotHaveHappened();
        }

        [Fact]
        public async Task SaveLinks_Valid_Payload_Returns_CreatRequest()
        {
            // Arrange
            ILogger fakeLogger = A.Fake<ILogger>();
            LinkBundle bundle = Fixture.Create<LinkBundle>();

            HttpRequest req = this.AuthenticatedRequest;
            req.Body = this.GetHttpRequestBodyStream(JsonConvert.SerializeObject(bundle));
            IAsyncCollector<LinkBundle> collector = A.Fake<IAsyncCollector<LinkBundle>>();

            // Act
            IActionResult result = await LinkOperations.SaveLinks(req, collector, fakeLogger);

            // Assert
            Assert.IsType<CreatedResult>(result);

            CreatedResult createdResult = result as CreatedResult;
            LinkBundle createdBundle = createdResult.Value as LinkBundle;
            Assert.Equal("userid", createdBundle.UserId);

            A.CallTo(() => collector.AddAsync(A<LinkBundle>.That.Matches(b => b.UserId == "userid"),
                default(CancellationToken))).MustHaveHappened();
        }
    }
}
