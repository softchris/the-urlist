using System;
using System.Linq;
using System.Threading.Tasks;

namespace LinkyLink.Infrastructure
{
    public interface IBlackListChecker
    {
        Task<bool> Check(string value);
    }

    public class EnvironmentBlackListChecker : IBlackListChecker
    {
        private string[] _blackList;
        public EnvironmentBlackListChecker(string key)
        {
            if (string.IsNullOrEmpty(key)) throw new ArgumentNullException(nameof(key));

            string settingsValue = Environment.GetEnvironmentVariable(key);
            if (string.IsNullOrEmpty(settingsValue)) throw new Exception($"Blacklist key '{key}' is not set");

            this._blackList = settingsValue.Split(',');
        }
        public Task<bool> Check(string value)
        {
            return Task.FromResult(_blackList.Contains(value));
        }
    }
}