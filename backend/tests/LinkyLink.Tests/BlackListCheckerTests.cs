using System;
using System.Threading.Tasks;
using LinkyLink.Infrastructure;
using LinkyLink.Tests.Helpers;
using Xunit;

namespace LinkyLink.Tests
{
    public class EnvironmentBlackListCheckerTests : TestBase
    {
        [Fact]
        public void Check_Throws_Exception_On_Empty_Key()
        {
            // Arrange
            string key = string.Empty;
            EnvironmentBlackListChecker checker = new EnvironmentBlackListChecker(key);

            // Act
            Assert.ThrowsAsync<ArgumentNullException>(() => checker.Check(key));
        }


        [Fact]
        public async Task Check_Throws_Exception_On_Empty_BlackList_Value()
        {
            // Arrange
            Environment.SetEnvironmentVariable("key", "value");
            string key = "key";
            EnvironmentBlackListChecker checker = new EnvironmentBlackListChecker(key);

            // Act
            Exception ex = await Assert.ThrowsAsync<Exception>(() => checker.Check(key));
            Assert.Equal($"Blacklist key '{key}' is not set", ex.Message);
        }

        [Fact]
        public async Task Check_Compares_Input_To_Blacklist()
        {
            // Arrange
            Environment.SetEnvironmentVariable("key", "1,2,3,4,5,6");
            string key = "key";
            EnvironmentBlackListChecker checker = new EnvironmentBlackListChecker(key);

            // Act
            bool result_1 = await checker.Check("1");
            bool result_2 = await checker.Check("10");

            // Assert
            Assert.True(result_1);
            Assert.True(!result_2);
        }
    }
}